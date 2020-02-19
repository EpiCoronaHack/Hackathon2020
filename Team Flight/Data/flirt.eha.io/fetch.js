/**
 * Script used for fetching flight data from https://flirt.eha.io/
 * 
 * Description:
 * flirt.eha.io uses Meteor for its data-layer. We can use remote procedure 
 * calls (RPC) using Meteor methods and query the backend for flights
 * leaving a given region (city, country, airport, etc).
 * 
 * Usage:
 * 1. Go to https://flirt.eha.io/
 * 2. Open browser console (ctrl-shift-j in chrome)
 * 3. Paste this script and press enter.
 * 4. If successfull, the variable 'flights' contains the requested flight information.
 * 
 * Airport Codes:
 * For possible list of airport codes, analyze websockets connection while searching for flights through UI by country or city. Look for call to `flightsByQuery` method. You may also airport find the codes from other resources.
 */

// All the airports in China
airport_codes = ["AAT","ACX","AEB","AHJ","AKU","AOG","AQG","AVA","AXF","BAV","BFJ","BHY","BPE","BPL","BPO","BPX","BSD","CAN","CGD","CGO","CGQ","CHG","CIF","CIH","CKG","CSX","CTU","CWJ","CZX","DAT","DAX","DBC","DCY","DDG","DDV","DHU","DIG","DLC","DLU","DNH","DOY","DQA","DSN","DYG","DYN","EJN","ENH","ENY","ERL","FOC","FUG","FUO","FYG","FYJ","FYN","GKW","GMQ","GOQ","GXH","GYS","GYU","HAK","HBP","HCJ","HDG","HEK","HET","HFE","HGH","HIA","HJJ","HLD","HLH","HMI","HNY","HPG","HRB","HSD","HSN","HTN","HTT","HUO","HUZ","HXD","HYN","HZG","HZH","INC","IQM","IQN","IUO","JDZ","JGD","JGN","JGS","JHG","JIC","JIQ","JIU","JJN","JMU","JNG","JNZ","JUH","JUZ","JXA","JXS","JYQ","JZH","KCA","KGT","KHG","KHN","KJH","KJI","KMG","KOW","KRL","KRY","KVN","KWE","KWL","LCX","LDS","LFQ","LHW","LJG","LLB","LLF","LLV","LNJ","LPF","LQP","LQQ","LQS","LUM","LXA","LYA","LYG","LYI","LZH","LZO","LZY","MDG","MIG","MXZ","NAO","NAY","NBS","NDG","NGB","NGQ","NHG","NKG","NKJ","NLH","NLT","NNG","NNY","NTG","NZH","NZL","OHE","PEK","PVG","PXG","PZI","QHX","RHT","RIZ","RKZ","RLK","RLZ","SHA","SHE","SHF","SHS","SJW","SQJ","SWA","SYG","SYM","SYX","SZV","SZX","TAO","TCG","TCZ","TEN","TGO","TGX","THQ","TJJ","TLQ","TNA","TNH","TSN","TVS","TVX","TXN","TYN","UCB","URC","UYN","VBL","WDS","WEC","WEF","WEH","WLI","WNH","WNZ","WUA","WUH","WUS","WUT","WUX","WUZ","WXN","WZQ","XFN","XIC","XIL","XIY","XMN","XNN","XUZ","XYW","YBP","YCU","YIC","YIE","YIH","YIN","YIW","YKH","YNJ","YNT","YNZ","YTY","YUG","YUS","YZY","ZAT","ZGN","ZHA","ZHY","ZIY","ZNG","ZQZ","ZTI","ZUH","ZUI","ZUJ","ZYI","ZYK"]

// global flights variable containing fetched data from server
let flights;

getFlights({
  airport_code_list: airport_codes,
  start_date: new Date('Feb 18 2020'),
  end_date: new Date('Feb 18 2020'),
})

// Query the backend for flight information
function getFlights({airport_code_list, start_date, end_date}) {
  // This query was built by analyzing the network communication with meteor backend
  query = {
    discontinuedDate: {$gte: start_date},
    effectiveDate: {$lte: end_date},
    "departureAirport._id": {$in: airport_code_list}
  }

  // TODO: what is third parameter used for?
  Meteor.call('flightsByQuery', query, 3000, (err,res)=> {
    if (err) {
      console.log("Requests was unsuccessfull.")
      console.log(err)
    }
    console.log(res)
    flights = res
  })
}