export function ReportMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="report-metric">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  )
}

export function SalaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="report-metric salary-metric">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  )
}
