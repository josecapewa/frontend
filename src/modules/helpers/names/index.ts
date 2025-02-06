export function getFirstAndLastName(name: string) {
  const names = name.trim().split(" ");
  if (names.length === 1) return name;
  const firstName = names[0];
  const lastName = names.reverse().find((name) => name !== "");
  return `${firstName} ${lastName}`;
}
export function getInitials(fullName?: string): string {
  if (!fullName) return "";
  const nameParts = fullName.trim().split(" ");

  if (nameParts.length < 2) {
    throw new Error(
      "O nome completo deve conter pelo menos um primeiro e um último nome."
    );
  }

  const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
  const lastNameInitial = nameParts[nameParts.length - 1]
    .charAt(0)
    .toUpperCase();

  return firstNameInitial + lastNameInitial;
}

export function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function getAbreviatedName(name: string) {
  if (name.trim().split(" ").length === 1) {
    return name;
  }
  const names = name.split(" ");
  return names.reduce((acc, currentName, index) => {
    if (index == 0 || index == names.length - 1 || currentName.length <= 2) {
      acc += ` ${currentName}`;
      return acc;
    }
    const firstLetter = currentName.charAt(0).toUpperCase();
    acc += ` ${firstLetter}.`;
    return acc;
  }, "");
}

export function getNamesList(names: string[]) {
  return names.reduce((acc, name, index) => {
    if (index === 0) return name;
    if (index === names.length - 1) return `${acc} e ${name}`;
    return `${acc}, ${name}`;
  }, "");
}
