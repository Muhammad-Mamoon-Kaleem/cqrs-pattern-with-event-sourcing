export class CreateAccountCommand {
  constructor(
    public readonly accountId: string,
    public readonly name: string,
  ) {}
}
