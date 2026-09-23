import '../styles/globals.css'

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
            <h3 className="card-title">Secondary</h3>
            <div className="card-content">
              <div style={{ width: '100%', height: '40px', backgroundColor: '#5a9fb5' }}></div>
              <div style={{ marginTop: '10px' }}><code>#5a9fb5</code></div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Tertiary</h3>
            <div className="card-content">
              <div style={{ width: '100%', height: '40px', backgroundColor: '#7cb342' }}></div>
              <div style={{ marginTop: '10px' }}><code>#7cb342</code></div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Error</h3>
            <div className="card-content">
              <div style={{ width: '100%', height: '40px', backgroundColor: '#d32f2f' }}></div>
              <div style={{ marginTop: '10px' }}><code>#d32f2f</code></div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Surface</h3>
            <div className="card-content">
              <div style={{ width: '100%', height: '40px', backgroundColor: '#ffffff' }}></div>
              <div style={{ marginTop: '10px' }}><code>#ffffff</code></div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Surface Variant</h3>
            <div className="card-content">
              <div style={{ width: '100%', height: '40px', backgroundColor: '#e9ecef' }}></div>
              <div style={{ marginTop: '10px' }}><code>#e9ecef</code></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Typography</h2>
        <div className="grid">
          <div className="card">
            <h3 className="card-title">Display</h3>
            <div className="card-content" style={{ fontSize: '48px', lineHeight: '56px' }}>
              Display — 48px / 56px
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Headline Large</h3>
            <div className="card-content" style={{ fontSize: '36px', lineHeight: '44px' }}>
              Headline Large — 36px / 44px
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Headline Medium</h3>
            <div className="card-content" style={{ fontSize: '28px', lineHeight: '36px' }}>
              Headline Medium — 28px / 36px
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Title Large</h3>
            <div className="card-content" style={{ fontSize: '20px', lineHeight: '28px' }}>
              Title Large — 20px / 28px
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Body Large</h3>
            <div className="card-content" style={{ fontSize: '18px', lineHeight: '28px' }}>
              Body Large — 18px / 28px
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Body Medium</h3>
            <div className="card-content" style={{ fontSize: '16px', lineHeight: '24px' }}>
              Body Medium — 16px / 24px
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Label Medium</h3>
            <div className="card-content" style={{ fontSize: '14px', lineHeight: '20px' }}>
              Label Medium — 14px / 20px
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Label Small</h3>
            <div className="card-content" style={{ fontSize: '12px', lineHeight: '16px' }}>
              Label Small — 12px / 16px
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Components</h2>
        <div className="grid">
          <div className="card">
            <h3 className="card-title">Button</h3>
            <div className="card-content">
              <button className="button">Primary Button</button>
              <button className="button button-secondary">Secondary Button</button>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Card</h3>
            <div className="card-content">
              This is a sample card with elevation and rounded corners.
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Input</h3>
            <div className="card-content">
              <input type="text" placeholder="Enter text" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Icon</h3>
            <div className="card-content">
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Spacing & Elevation</h2>
        <div className="card">
          <div className="card-title">Spacing Scale</div>
          <div className="card-content">
            <p><strong>unit (8px)</strong>: Base unit</p>
            <p><strong>sm (12px)</strong>: 1.5× unit</p>
            <p><strong>md (24px)</strong>: 3× unit</p>
            <p><strong>lg (40px)</strong>: 5× unit</p>
            <p><strong>xl (64px)</strong>: 8× unit</p>
            <p><strong>gutter (24px)</strong>: Horizontal container padding</p>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Elevation Levels</div>
          <div className="card-content">
            <p><strong>Level 1 (Base)</strong>: none</p>
            <p><strong>Level 2 (Cards)</strong>: 0 4px 12px rgba(0,0,0,0.1)</p>
            <p><strong>Level 3 (Modals)</strong>: 0 8px 24px rgba(0,0,0,0.12)</p>
            <p><strong>Focus Ring</strong>: 0 0 0 3px rgba(10,126,164,0.1)</p>
          </div>
        </div>
      </section>
    </div>
  )
}