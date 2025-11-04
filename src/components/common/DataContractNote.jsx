import { formatDateTime } from '../../utils/formatters'

export function DataContractNote({ schema, generatedAt }) {
  if (!schema) return null

  return (
    <div className="mt-8 rounded-3xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
      <p className="font-semibold text-slate-600">Sample data contract</p>
      <p className="mt-2">
        This screen is powered by the <code>{schema}</code> mock payload. Mirror the shape documented in
        <code> src/data/contracts.js </code> when wiring your backend so the frontend continues to work without changes.
      </p>
      {generatedAt && (
        <p className="mt-2 text-slate-400">Dataset generated on {formatDateTime(generatedAt)} (IST).</p>
      )}
    </div>
  )
}
