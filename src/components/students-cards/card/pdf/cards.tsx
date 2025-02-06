import { Page, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { StudentPDFCard } from ".";
import dayjs from "dayjs";

export type StudentPDFCardsProps
 = {
  students?: (StudentInClassCard & { cardModel?: CardModel })[];
}
Font.register({
  family: "Segoe UI",
  fonts: [
    {
      src: "/fonts/Segoe UI.ttf",
    },
    {
      src: "/fonts/Segoe UI Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/Segoe UI Italic.ttf",
      fontStyle: "italic",
    },
    {
      src: "/fonts/Segoe UI Bold Italic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

export function StudentPDFCards({ students }: StudentPDFCardsProps) {
  const title = `Cartões ${dayjs().format("DD/MM/YYYY")}`;

 
  
  return (
    <Document subject={title} title={title}>
      <Page size="A4" style={styles.page}>
        {students?.map((student, index) => (
          <>
            <StudentPDFCard
              key={`${index}-card-front`}
              student={student}
              cardModel={student.cardModel}
            />
            <Image
              key={`${index}-card-back`}
              style={styles.card}
              src={`${import.meta.env.VITE_IMAGES_DIR}/${
                student.cardModel?.foto_verso
              }`}
            />
          </>
        ))}
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Segoe UI",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingHorizontal: 30,
    gap: 15,
  },
  card: {
    width: 240,
    height: 153,
    position: "relative",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
});

Font.registerHyphenationCallback((word) => {
  return [word];
});
