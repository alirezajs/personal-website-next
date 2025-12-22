export default function Privacy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-4">This website does not collect, store, or process personal data.</p>
      <ul className="list-disc list-inside text-gray-600 mb-6">
        <li>No cookies</li>
        <li>No analytics or tracking</li>
        <li>No forms or data submission</li>
        <li>Contact via email link (you handle separately)</li>
      </ul>
      <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
    </main>
  );
}