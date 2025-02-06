// import { TPossibleStudentFormData } from "@/components/student/info-form";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface StudentStore {
//   currentStep: number;
//   formData: Record<number, TPossibleStudentFormData>;
//   setFormData: (step: number, data: TPossibleStudentFormData) => void;
//   setStep: (step: number) => void;
//   reset: () => void;
// }

// export const useStudentFormStore = create<StudentStore>()(
//   persist(
//     (set) => ({
//       currentStep: 0,
//       formData: {},
//       setFormData: (step, data) =>
//         set((state) => ({
//           formData: {
//             ...state.formData,
//             [step]: data,
//           },
//         })),
//       setStep: (step) => set({ currentStep: step }),
//       reset: () => set({ currentStep: 0, formData: {} }),
//     }),
//     {
//       name: "student-store",
//     }
//   )
// );
