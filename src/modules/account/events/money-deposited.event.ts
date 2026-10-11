export class MoneyDepositedEvent {
  constructor(
    public readonly accountId: string,
    public readonly amount: number,
  ) {}
}
