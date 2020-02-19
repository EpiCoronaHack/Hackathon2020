// All the airports in China
airport_codes = ["AAT", "ACX", "AEB", "AHJ", "AKU", "AOG", "AQG", "AVA", "AXF", "BAV", "BFJ", "BHY", "BPE", "BPL", "BPO", "BPX", "BSD", "CAN", "CGD", "CGO", "CGQ", "CHG", "CIF", "CIH", "CKG", "CSX", "CTU", "CWJ", "CZX", "DAT", "DAX", "DBC", "DCY", "DDG", "DDV", "DHU", "DIG", "DLC", "DLU", "DNH", "DOY", "DQA", "DSN", "DYG", "DYN", "EJN", "ENH", "ENY", "ERL", "FOC", "FUG", "FUO", "FYG", "FYJ", "FYN", "GKW", "GMQ", "GOQ", "GXH", "GYS", "GYU", "HAK", "HBP", "HCJ", "HDG", "HEK", "HET", "HFE", "HGH", "HIA", "HJJ", "HLD", "HLH", "HMI", "HNY", "HPG", "HRB", "HSD", "HSN", "HTN", "HTT", "HUO", "HUZ", "HXD", "HYN", "HZG", "HZH", "INC", "IQM", "IQN", "IUO", "JDZ", "JGD", "JGN", "JGS", "JHG", "JIC", "JIQ", "JIU", "JJN", "JMU", "JNG", "JNZ", "JUH", "JUZ", "JXA", "JXS", "JYQ", "JZH", "KCA", "KGT", "KHG", "KHN", "KJH", "KJI", "KMG", "KOW", "KRL", "KRY", "KVN", "KWE", "KWL", "LCX", "LDS", "LFQ", "LHW", "LJG", "LLB", "LLF", "LLV", "LNJ", "LPF", "LQP", "LQQ", "LQS", "LUM", "LXA", "LYA", "LYG", "LYI", "LZH", "LZO", "LZY", "MDG", "MIG", "MXZ", "NAO", "NAY", "NBS", "NDG", "NGB", "NGQ", "NHG", "NKG", "NKJ", "NLH", "NLT", "NNG", "NNY", "NTG", "NZH", "NZL", "OHE", "PEK", "PVG", "PXG", "PZI", "QHX", "RHT", "RIZ", "RKZ", "RLK", "RLZ", "SHA", "SHE", "SHF", "SHS", "SJW", "SQJ", "SWA", "SYG", "SYM", "SYX", "SZV", "SZX", "TAO", "TCG", "TCZ", "TEN", "TGO", "TGX", "THQ", "TJJ", "TLQ", "TNA", "TNH", "TSN", "TVS", "TVX", "TXN", "TYN", "UCB", "URC", "UYN", "VBL", "WDS", "WEC", "WEF", "WEH", "WLI", "WNH", "WNZ", "WUA", "WUH", "WUS", "WUT", "WUX", "WUZ", "WXN", "WZQ", "XFN", "XIC", "XIL", "XIY", "XMN", "XNN", "XUZ", "XYW", "YBP", "YCU", "YIC", "YIE", "YIH", "YIN", "YIW", "YKH", "YNJ", "YNT", "YNZ", "YTY", "YUG", "YUS", "YZY", "ZAT", "ZGN", "ZHA", "ZHY", "ZIY", "ZNG", "ZQZ", "ZTI", "ZUH", "ZUI", "ZUJ", "ZYI", "ZYK"]

// contains transformed schedules data based on schema in README.md
// month when coronavirus began
let start_date = new Date('Nov 1 2019');
let end_date = new Date('Feb 19 2020');
let schedules;

getSchedules({ airport_codes, start_date, end_date, limit: 3000 },
  (err, res) => {
    if (err) console.log('Requests was unsuccessful', err);

    console.log('Raw Data', res);
    schedules = transform(res.flights, [start_date, end_date]);
    console.log('Transform Data', schedules);
  }
);
console.log('Waiting for data...');
