export const formatStudentAverage = (note: number) => {
  const noteString = note.toString();
  const parts = noteString.split(".");

  if (parts.length === 1) {
    return parseInt(parts[0]);
  }

  const [originalNote, decimalUnit] = parts;

  if (parseFloat("0." + decimalUnit) < 0.499999) {
    return parseInt(originalNote);
  }

  return parseInt(originalNote) + 1;
};


export function getNumberOfStars(average:number){
  if(average>=16){
    return 5;
  }
  if(average>=15){
    return 4;
  }
  if(average>=14){
    return 3;
  }
  return 0;
}