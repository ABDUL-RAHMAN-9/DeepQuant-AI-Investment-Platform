// Defined the data set
const companies = [
  'Wealthro',
  'Finyon',
  'Aegra',
  'Postvio',
  'Vaultic',
  'NexusCorp',
  'SynergyLabs',
  'Innovatech'
];

const TrustedBy = () => {
  // Duplicate the array to ensure a seamless loop
  const scrollingCompanies = [...companies, ...companies];
  
  return (
    // The main section container
    <section className="py-4 border-y border-border/30 bg-background overflow-hidden">
      
      {/* Static Text - Modernized UI */}
      <div className="container mx-auto px-6 mb-6">
        <h2 className="text-center text-3xl font-bold text-foreground mb-4">Trusted By</h2>
        <p className="text-center text-muted-foreground">The world's leading teams rely on us.</p>
      </div>

      {/* Marquee Wrapper - Creates the blur/masking effect */}
      <div 
        className="relative w-full overflow-x-hidden 
                   [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
      >
        
        {/* The scrolling track - animate-scroll applies the infinite animation */}
        <div className="flex w-fit animate-scroll space-x-16">
          
          {/* Map over the duplicated companies for the loop */}
          {scrollingCompanies.map((company, index) => (
            <div 
              key={`${company}-${index}`} 
              className="flex-shrink-0 text-3xl font-extrabold text-foreground/70 tracking-widest uppercase hover:text-foreground transition-colors cursor-default"
              style={{ minWidth: 'fit-content' }}
            >
              {company}
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;