//
// Created by george on 2020-02-18.
//

#include "csv_read.hpp"
#include "model.hpp"

#include <iostream>



int main(int argc, char* argv[])
{
    constexpr auto k_data_confirmed_cases = "../data/novel-corona-virus-2019-dataset/time_series_2019_ncov_confirmed.csv";
    constexpr auto k_data_deaths_cases = "../data/novel-corona-virus-2019-dataset/time_series_2019_ncov_deaths.csv";
    constexpr auto k_data_recovered_cases = "../data/novel-corona-virus-2019-dataset/time_series_2019_ncov_recovered.csv";

    auto confirmed_cases = extract_data_from_csv(k_data_confirmed_cases);
    auto deaths = extract_data_from_csv(k_data_deaths_cases);
    auto recovered = extract_data_from_csv(k_data_recovered_cases);

    auto show_imported_data = [](auto& filepath)
    {
        const auto read_csv = extract_data_from_csv(filepath);

        for(const auto& timepoint_counts: read_csv)
        {
            for(const auto& count: timepoint_counts)
                std::cout<<count<<", ";
            std::cout<<std::endl;
        }
    };




}