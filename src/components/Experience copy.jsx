export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-[#0D1B2A] text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-cyan-400">Experience</h2>

        {/* Demand Planning Analyst */}
        <div className="mt-10 px-6 max-w-3xl mx-auto border-l-4 border-cyan-400 pl-6">
          <h3 className="text-2xl font-semibold">Demand Planning Analyst</h3>
          <p className="text-gray-300">Emerson Electric (Asia) Ltd. ROHQ | June 2023 – Present</p>
          <ul className="mt-3 text-gray-400 space-y-2">
            <li>Compiled reports detailing demand plans and forecasts.</li>
            <li>Developed custom dashboards to deliver actionable insights.</li>
            <li>Automated reports using Power BI & Power Query.</li>
          </ul>
        </div>

        {/* Quality Assurance Engineer */}
        <div className="mt-10 px-6 max-w-3xl mx-auto border-l-4 border-cyan-400 pl-6">
          <h3 className="text-2xl font-semibold">Quality Assurance Engineer</h3>
          <p className="text-gray-300">Citizen Finedevice Philippines Corporation | Nov 2020 – May 2023</p>
          <ul className="mt-3 text-gray-400 space-y-2">
            <li>Led root cause analysis for product quality improvements.</li>
            <li>Developed Excel tools to automate data processing.</li>
            <li>Increased process yield by 2.7% through continuous improvement.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
