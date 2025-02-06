import { toastPromiseConfig } from "@/components/config/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
export type UserProfileData = {
  nome_usuario?: string;
  email?: string;
  password?: string;
  telefone?: string;
};
export default function UserProfileForm({
  userDefaultData,
  onEdit,
  userImage,
}: {
  userDefaultData?: UserProfileData;
  onEdit: (data: UserProfileData) => Promise<void>;
  userImage: File | null;
}) {
  const [userData, setUserData] = useState<UserProfileData>();
  const [loading, setLoading] = useState(false);

  const values = userData
    ? [
        ...Object.keys(userData).map(
          (key) => userData[key as keyof UserProfileData]
        ),
        userImage,
      ]
    : [];
  const handleEdit = (data: UserProfileData) => {
    setLoading(true);
    toastPromiseConfig({
      fn: onEdit(data)
        .then(() => {
          setUserData(undefined);
          setLoading(false);
        })
        .catch(() => setUserData(undefined)),
      loading: "Actualizando as suas informações",
      success: "As suas informações foram actualizadas com sucesso",
    });
    setUserData(undefined);
  };
  const handleFieldEdit = (value: string, field: keyof UserProfileData) => {
    setUserData((data) => {
      return { ...data, [field]: value.trim() === "" ? undefined : value };
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit(userData!);
      }}
      method="POST"
      className="flex flex-col gap-4 [&>*]:gap-2"
    >
      <Label className="flex flex-col">
        Nome de usuário
        <Input
          disabled={loading}
          value={userData?.nome_usuario ?? userDefaultData?.nome_usuario}
          onChange={(e) => handleFieldEdit(e.target.value, "nome_usuario")}
        />
      </Label>
      <Label className="flex flex-col">
        Telefone
        <Input
          disabled={loading}
          value={userData?.telefone ?? userDefaultData?.telefone}
          onChange={(e) => handleFieldEdit(e.target.value, "telefone")}
        />
      </Label>
      <Label className="flex flex-col">
        Email
        <Input
          disabled={loading}
          value={userData?.email ?? userDefaultData?.email}
          onChange={(e) => handleFieldEdit(e.target.value, "email")}
        />
      </Label>
      <Label className="flex flex-col">
        Password (deixe em branco para manter)
        <Input
          disabled={loading}
          value={userData?.password}
          onChange={(e) => handleFieldEdit(e.target.value, "password")}
        />
      </Label>
      <div>
        <Button
          disabled={
            loading ||
            values.every((value) => value === undefined || value === "")
          }
          type="submit"
        >
          Confirmar
        </Button>
      </div>
    </form>
  );
}
