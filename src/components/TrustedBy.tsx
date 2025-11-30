const companies = [
  'Wealthro',
  'Finyon',
  'Aegra',
  'Postvio',
  'Vaultic'
];

const TrustedBy = () => {
  return (
    <section className="py-16 border-y border-border/30">
      <div className="container mx-auto px-6">
        <p className="text-center text-muted-foreground mb-8">Trusted by top innovative teams</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {companies.map((company) => (
            <div key={company} className="text-xl font-semibold text-foreground/60 hover:text-foreground transition-colors">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
