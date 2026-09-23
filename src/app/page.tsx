import './globals.css'

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <div className="logo">Aside Design System</div>
        <p className="description">
          Complete design system extracted from the Aside browser (v1.0.914.1).
          Includes color tokens, typography, spacing, elevation, components, and icons.
        </p>
      </header>

      <section className="section">
        <h2 className="section-title">Color Palette</h2>
        <div className="grid">
          <div className="card">
            <h3 className="card-title">Primary</h3>
            <div className="card-content">
              <div style={{ width: '100%', height: '40px', backgroundColor: '#0a7ea4' }}></div>
              <div style={{ marginTop: '10px' }}><code>#0a7ea4</code></div>
            </div>
          </div>
          <div className="card">
            <h3 className: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
            { label: 'Error', value: 'error' },
            { label: 'Surface', value: 'surface' },
            { label: 'Surface Variant', value: 'surface-variant' },
          ]}
          value="primary"
          onChange={v => console.log(v)}
          placeholder="Select color"
          searchable
        />
        <div className="mt-4">
          <p>Selected color: {selectedColor}</p>
        </div>
      </div>
    </div>
  )
}