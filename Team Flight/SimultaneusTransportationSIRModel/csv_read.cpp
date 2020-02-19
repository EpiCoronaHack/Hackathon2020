//
// Created by george on 2020-02-19.
//

#include "csv_read.hpp"

#include <boost/filesystem.hpp>
#include "csv-parser/parser.hpp"


NCovTimeseriesProvinceData extract_data_from_csv(std::string_view filename)
{
    NCovTimeseriesProvinceData d;

    boost::filesystem::ifstream reader(std::string{filename});
    aria::csv::CsvParser parser = aria::csv::CsvParser(reader);

    auto csv_row_itr = parser.begin();
    {
        const std::vector<std::string> header_cells = *csv_row_itr;
        d.timepoint_count = header_cells.size() - 4;
        for (size_t timepoint = 0; timepoint < d.timepoint_count; timepoint++)
            d.dates_string_for_timepoint.push_back(header_cells[timepoint + 4]);
    }
    csv_row_itr++;

    d.counts = std::vector<std::vector<double>>(d.timepoint_count);

    for(size_t province_id_counter = 0; csv_row_itr != parser.end(); csv_row_itr++, province_id_counter++)
    {
        // Parse the csv cells;
        const std::vector<std::string> cells = *csv_row_itr;

        // Save the province name and it's id
        const auto province_name = cells[0]+" - "+cells[1];
        d.name_province_id_map[province_name] = province_id_counter;
        d.province_id_name_map.push_back(province_name);

        // Then put the cases count for each timepoint_vector

        // skip lat and long
        for(size_t timepoint = 0; timepoint<d.timepoint_count;timepoint++)
        {
            auto str_cell = cells[timepoint+4];
            auto cases_on_this_timepoint = !str_cell.empty() ? std::stoul(str_cell) : 0;
            d.counts[timepoint].push_back(cases_on_this_timepoint);
        }
    }

    d.province_count = d.counts[0].size();

    return d;

}
