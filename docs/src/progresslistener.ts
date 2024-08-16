interface ProgressListener {
  start(total: number, message: string): void
  update(value: number): void
  stop(): void
}
