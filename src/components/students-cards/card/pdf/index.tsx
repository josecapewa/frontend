import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

export function StudentPDFCard({
  student,
  cardModel,
}: {
  student?: StudentInClassCard;
  cardModel?: CardModel;
}) {
  const studentImage = `${import.meta.env.VITE_IMAGES_DIR}/${
    student?.aluno.pessoa.foto
  }`;

  const course = student?.turma.nome_turma.curso;

  const room = student?.turma.sala;

  return (
    <View style={styles.card}>
      <Image
        style={styles.model}
        src={`${import.meta.env.VITE_IMAGES_DIR}/${cardModel?.foto_frente}`}
      />
      <Text style={styles._class}>
        {`${student?.n_turma || "N/A"} - ${
          student?.turma.nome_turma.designacao || "N/A"
        }`}
      </Text>
      <View style={styles.identification}>
        <View
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Image style={styles.icon} src="/ipil_icon.jpg" />
          <View
            style={{
              width: "39%",
              marginTop: 1.5,
            }}
          >
            <Text style={styles.label}>ÁREA DE FORMAÇÃO: </Text>
            <Text>
              {course?.area_formacao.nome.toLocaleUpperCase() || "N/A"}
            </Text>
            <Text>
              <Text style={styles.label}>CURSO: </Text>
              <Text>{course?.nome.toLocaleUpperCase() || "N/A"}</Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            maxWidth: "35%",
            marginTop: 1.5,
          }}
        >
          <Text>
            <Text style={styles.label}>NOME: </Text>
            <Text>{student?.aluno.pessoa.nome || "N/A"}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>SALA: </Text>
            <Text>
              {room ? `${room.designacao} - ${room.sector.nome}` : "N/A"}
            </Text>
          </Text>
          <Text>
            <Text style={styles.label}>Nº PROC: </Text>
            <Text>{student?.aluno.n_processo || "N/A"}</Text>
          </Text>
        </View>
      </View>
      <Image style={styles.photo} src={studentImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    height: 153,
    position: "relative",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  label: {
    color: "#276497",
  },
  model: {
    width: "100%",
    height: "auto",
    position: "absolute",
  },
  identification: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    fontSize: 6,
    lineHeight: 1.25,
    wordWrap: "normal",
    wordBreak: "keepAll",
    overflow: "hidden",
    marginTop: 12,
    marginLeft: 11,
    gap: 4.5,
  },
  _class: {
    position: "absolute",
    top: "52%",
    left: 10,
    fontWeight: "bold",
    fontSize: 10,
    color: "#276497",
  },
  photo: {
    width: 59,
    zIndex: -10,
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translateX(-31%)",
  },
  icon: {
    width: 40,
    height: 40,
  },
});
