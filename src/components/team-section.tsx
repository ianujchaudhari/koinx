import Image from 'next/image'

export function TeamSection() {
  const team = [
    {
      name: "John Smith",
      role: "Designation here",
      image: "john-smith.svg",
      bio: "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida adipiscing bibendum euismod morbi.",
    },
    {
      name: "Elina Williams",
      role: "Designation here",
      image: "ellena-williams.svg",
      bio: "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida adipiscing bibendum euismod morbi.",
    },
    {
      name: "John Smith",
      role: "Designation here",
      image: "john-smith-2.svg",
      bio: "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida adipiscing bibendum euismod morbi.",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-[#D3DFEE] p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-[#0F1629] mb-4 sm:mb-5">Team</h2>
      <p className="text-sm sm:text-base text-[#3E424A] leading-6 sm:leading-7 mb-4 sm:mb-6">
        Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu nibh. Eget mattis in mi integer sit egestas.
        Proin tempor id pretium quam. Facilisis purus convallis quam augue.
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

