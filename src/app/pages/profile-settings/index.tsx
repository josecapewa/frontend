import CustomTitle from "@/components/custom/title";
import UserProfileForm, {
  UserProfileData,
} from "@/components/user/profile-form";
import UserProfilePicture from "@/components/user/profile-picture";
import { userService } from "@/modules/services/api/user";
import { useSessionStore } from "@/modules/services/stores/session";
import { useState } from "react";

export default function UserSettingsPage() {
  const user = useSessionStore((state) => state.user);
  const setUser = useSessionStore((state) => state.setUser);
  const [userNewImage, setUserNewImage] = useState<File | null>(null);
  const existentPhoto = user?.foto;
  const userImage = existentPhoto
    ? `${import.meta.env.VITE_IMAGES_DIR}/${existentPhoto}`
    : undefined;

  async function handleOnEdit(data: UserProfileData) {
    const newUserData = await userService.simpleUpdate(user!.id, {
      ...data,
      foto: userNewImage ?? undefined,
    });
    setUser(newUserData);
  }
  return (
    <section>
      <CustomTitle>Meu perfil</CustomTitle>
      <article className="my-4 flex gap-4 items-center">
        <UserProfilePicture
          onImageChange={setUserNewImage}
          imageUrl={userImage}
        />
        <div>
          <h2 className="text-xl 2xl:text-4xl">{user?.nome ?? "N/A"}</h2>
        </div>
      </article>
      <section className="flex [&>*]:flex-grow flex-wrap gap-4 2xl:gap-10">
        {/* <div>
          <CustomTitle useCircle={false}>Dados pessoais</CustomTitle>
          <article className="p-4 rounded-md bg-white">
            <UserProfileForm />
          </article>
        </div> */}
        <div>
          <CustomTitle useCircle={false}>Dados de usuário</CustomTitle>
          <article className="p-4 rounded-md bg-white">
            <UserProfileForm
              userImage={userNewImage}
              onEdit={handleOnEdit}
              userDefaultData={{
                nome: user?.nome,
                email: user?.email,
                telefone: user?.telefone,
              }}
            />
          </article>
        </div>
      </section>
    </section>
  );
}
