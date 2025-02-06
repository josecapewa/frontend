// import { usePathname } from "next/navigation";
// import { useMemo } from "react";

// export default function NavigationTitle() {
//   const pathName = usePathname();
//   const [mainPath, children] = useMemo(() => {
//     const [nothing, mainPath, ...children] = pathName.split("/");
//     return [mainPath, children];
//   }, [pathName]);

//   return (
//     <section className="flex flex-col">
//       <Link
//         href={"/" + mainPath}
//         className="flex hover:opacity-80 items-center gap-2 font-bold text-xl"
//       >
//         <div className="bg-ipilOrange w-2 h-2 rounded-full" />
//         <h2>{mainPath[0].toUpperCase() + mainPath.substring(1)}</h2>
//       </Link>
//       <span className="flex items-center gap-2 text-base font-medium pl-5">
//         {children.map((child) => (
//           <Link
//             className="hover:opacity-80"
//             href={"/" + mainPath + ("/" + child)}
//           >
//             / {child[0].toUpperCase() + child.substring(1)}
//           </Link>
//         ))}
//       </span>
//     </section>
//   );
// }
