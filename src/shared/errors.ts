export class InvalidCredentialsError extends Error {
  constructor() {
    super("Email o contraseña incorrectos");
    this.name = "InvalidCredentialsError";
  }
}

export class NotFoundError extends Error {
  constructor(resource: string){
    super (`${resource} no encontrado`);
    this.name = "NotFoundError";
  }
}
