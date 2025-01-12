
export function AboutBitcoin() {
  return (
    <div className="bg-white rounded-lg border border-[#D3DFEE] p-8">
      <h2 className="text-2xl font-semibold text-[#0F1629] mb-5">
        About Bitcoin
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#0F1629] mb-2.5">
            What is Bitcoin?
          </h3>
          <p className="text-base text-[#3E424A] leading-7">
            Bitcoin's price today is US$46,953.04, with a 24-hour trading volume
            of $58.06B. BTC is +2.51% in the last 24 hours. It is currently
            -5.96% from its 7-day all-time high of $49,343.83, and 2.54% from
            its 7-day all-time low of $45,816.50. BTC has a circulating supply
            of 19.57M BTC and a max supply of 21M BTC.
          </p>
        </div>

        <div className="h-[1px] bg-[#D3DFEE]" />

        <div>
          <h3 className="text-xl font-bold text-[#0F1629] mb-2.5">
            Lorem ipsum dolor sit amet
          </h3>
          <div className="space-y-4">
            <p className="text-base text-[#3E424A] leading-7">
              Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit
              lobortis tristique pharetra. Diam id et lectus urna et tellus
              aliquam dictum at. Viverra diam suspendisse enim facilisis ac amet
              odio aliquam. Aliquam massa maecenas ac morbi augue mollis
              adipiscing semper.
            </p>
            <p className="text-base text-[#3E424A] leading-7">
              Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit
              lobortis tristique pharetra. Diam id et lectus urna et tellus
              aliquam dictum at. Viverra diam suspendisse enim facilisis ac amet
              odio aliquam. Aliquam massa maecenas ac morbi augue mollis
              adipiscing semper. Aliquam massa maecenas ac morbi augue mollis
              adipiscing semper.
            </p>
            <p className="text-base text-[#3E424A] leading-7">
              Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit
              lobortis tristique pharetra. Diam id et lectus urna et tellus
              aliquam dictum at. Viverra diam suspendisse enim facilisis ac amet
              odio aliquam.
            </p>
          </div>
        </div>

        <div className="h-[1px] bg-[#D3DFEE]" />

        <div>
          <h3 className="text-xl font-bold text-[#0F1629] mb-5">
            Already Holding Bitcoin?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-[#79F1A4] to-[#0E5CAD] rounded-lg p-4">
              <div className="flex items-center gap-6">
                <img
                  src="calculate-profits.svg"
                  alt="Calculate Profits"
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="text-white">
                  <h4 className="text-xl font-bold mb-2">
                    Calculate your Profits
                  </h4>
                  <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold">
                    Check Now →
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#FF9865] to-[#EF3031] rounded-lg p-4">
              <div className="flex items-center gap-6">
                <img
                  src="calculate-tax.svg"
                  alt="Calculate Tax"
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="text-white">
                  <h4 className="text-xl font-bold mb-2">
                    Calculate your tax liability
                  </h4>
                  <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold">
                    Check Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-[#D3DFEE]" />

        <div>
          <p className="text-base text-[#3E424A] leading-7">
            Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam
            massa vel convallis duis ac. Mi adipiscing semper scelerisque
            porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia
            congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in
            eget. Ullamcorper dui
          </p>
        </div>
      </div>
    </div>
  );
}
