export default function arePasswordsEqual(
  password: string,
  passwordConfirm: string
): boolean {
  return password === passwordConfirm;
}
