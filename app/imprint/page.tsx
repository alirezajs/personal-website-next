export default function Imprint() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-4">Imprint (Impressum)</h1>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Information according to § 5 TMG</h2>
      <p className="mb-2">
        Alireza Varmaghani<br />
        Berlin<br />
        Germany
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-2">Email: <a className="text-blue-500" href="mailto:alireza.varmaghani@gmail.com">alireza.varmaghani@gmail.com</a></p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Responsible for content</h2>
      <p className="text-gray-600 mb-4">Alireza Varmaghani</p>

      <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
    </main>
  );
}