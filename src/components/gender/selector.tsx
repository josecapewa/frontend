// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { genders } from "@/lib/utils";

// export default function GendrsSelector({
//   value,
//   onChange,
// }: {
//   value?: string;
//   onChange: (value: string) => void;
//   useInitialValue?: boolean;
// }) {
//   return (
//     <Select value={value} onValueChange={onChange}>
//       <SelectTrigger className="text-sm">
//         <SelectValue placeholder="Seleccione a área de formação" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Gêneros</SelectLabel>
//           {genders.map((gender) => (
//             <SelectItem key={gender.label} value={gender.value.toString()}>
//               {gender.label}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }
