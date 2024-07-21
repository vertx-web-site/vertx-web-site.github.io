interface FeaturesListProps {
  children: React.ReactNode
}

const FeaturesList = ({ children }: FeaturesListProps) => (
  <div className="grid grid-cols-6 gap-x-8 gap-y-10 md:gap-y-16 lg:gap-x-12 lg:gap-y-20">
    {children}
  </div>
)

export default FeaturesList
