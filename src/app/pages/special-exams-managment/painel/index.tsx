
//   const availableExamRupes =
//     rupes?.data.filter(
//       (rupe) =>
//         !rupe.usado &&
//         rupe.valor === rupeValues.exame &&
//         dayjs(rupe.data_validade).isAfter(dayjs())
//     ).length || 0;
//   const expiredExamRupes =
//     rupes?.data.filter(
//       ({ valor, data_validade }) =>
//         valor === rupeValues.exame && dayjs(data_validade).isBefore(dayjs())
//     ).length || 0;

//   const expiredUnpaidExamRupes =
//     rupes?.data.filter(
//       ({ valor, data_validade, aluno_rupe_exame }) =>
//         valor === rupeValues.exame &&
//         dayjs(data_validade).isBefore(dayjs()) &&
//         aluno_rupe_exame &&
//         !aluno_rupe_exame.pago
//     ).length || 0;

// <div className="w-full flex flex-col ">
//   <h1 className="text-2xl text-center font-semibold leading-none tracking-tight">
//     Estados dos Rupes dos alunos
//   </h1>
//   <span className="transition-all flex gap-2 max-break:flex-col">
//     <ExamRupesStatusChart rupes={rupes?.data} />
//     <ExamPaidRupesChart rupes={rupes?.data} />
//   </span>
// </div>


//       <h2 className="mt-4 py-2 border-b font-bold text-lg">Rupes</h2>
//       <section className="space-y-2 border-ipilOrange border-[.5px] max-w-fit p-4 rounded-md">
//         <p>
//           Total de rupes:{" "}
//           <span className="font-bold">{rupes?.info.totalItems || 0}</span>
//         </p>
//         <p>
//           Rupes disponiveis:{" "}
//           <span
//             className={cn("font-bold", {
//               "text-green-500": availableExamRupes > 15,
//               "text-red-500": availableExamRupes <= 15,
//             })}
//           >
//             {availableExamRupes}
//           </span>
//         </p>
//         {expiredExamRupes > 0 && (
//           <p>
//             Rupes expirados:{" "}
//             <span className="text-red-800 font-bold">
//               {expiredExamRupes} ({expiredUnpaidExamRupes} não pagos)
//             </span>
//           </p>
//         )}
//       </section>