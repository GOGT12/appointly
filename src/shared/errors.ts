export class InvalidCredentialsError extends Error {
  constructor() {
    super("Email o contraseña incorrectos");
    this.name = "InvalidCredentialsError";
  }
}
