import Image from 'next/image'

export function TeamSection() {
  const team = [
    {
      name: "John Doe",
      role: "Senior Software Engineer",
      image: "john-smith.svg",
      bio: "John is a seasoned engineer with over 10 years of experience in distributed systems and blockchain technology. He previously led the core protocol team at a major DeFi project, contributing to the development of secure and scalable smart contracts.",
    },
    {
      name: "Elina Williams",
      role: "Chief Technology Officer",
      image: "ellena-williams.svg",
      bio: "Elina is a cryptography expert and former researcher at a leading tech institute. She is passionate about privacy-preserving protocols and scalable blockchain architecture, driving the technical vision for the platform.",
    },
    {
      name: "Alex Thompson",
      role: "Product Manager",
      image: "john-smith-2.svg",
      bio: "Alex brings a wealth of experience in fintech and product strategy. He focuses on creating intuitive user experiences that bridge the gap between traditional finance and decentralized applications, making crypto accessible to everyone.",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-[#D3DFEE] p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-[#0F1629] mb-4 sm:mb-5">Team</h2>
      <p className="text-sm sm:text-base text-[#3E424A] leading-6 sm:leading-7 mb-4 sm:mb-6">
        Meet the dedicated team behind the platform. Our diverse group of experts combines deep knowledge in blockchain technology, finance, and user experience design to deliver the best crypto tracking tools.
      </p>
      <div className="space-y-4 sm:space-y-6">
        {team.map((member, index) => (
          <div key={index} className="p-4 sm:p-6 bg-[#E8F4FD] rounded-lg">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="text-center sm:w-[160px] flex flex-col items-center">
                <div className="w-24 h-24 sm:w-[120px] sm:h-[120px] relative mb-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <h3 className="text-base font-semibold text-[#0F1629] mb-1">{member.name}</h3>
                <p className="text-sm text-[#788F9B]">{member.role}</p>
              </div>
              <p className="flex-1 text-sm sm:text-base text-[#0F1629] leading-6 sm:leading-7 text-center sm:text-left">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

