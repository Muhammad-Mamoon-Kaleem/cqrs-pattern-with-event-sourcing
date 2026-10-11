export class DepositMoneyCommand {
  constructor(
    public readonly accountId: string,
    public readonly amount: number,
  ) {}
}
