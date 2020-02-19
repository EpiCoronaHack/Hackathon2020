//
// Created by george on 2020-02-19.
//
#pragma once

#include <vector>
#include <unordered_map>
#include <string>


template<class T> using ByProvinceVector = std::vector<T>;
template<class T> using ByTimepointVector = std::vector<T>;

constexpr size_t k_wuhan_province = 0;
constexpr size_t k_wuhan_market_initial_cases = 86;


// TODO integrate in the regression
static size_t get_zoonotic_coefficient(size_t province, size_t time)
{
    return province == k_wuhan_province && time == 0 ? 86 : 0;
}


struct NCovTimeseriesProvinceData
{
    using QualifiedProvinceName = std::string;

    size_t province_count = 0;
    std::unordered_map<QualifiedProvinceName,size_t> name_province_id_map;
    ByProvinceVector<QualifiedProvinceName> province_id_name_map;

    size_t timepoint_count = 0;
    std::vector<std::string> dates_string_for_timepoint;

    ByTimepointVector<ByProvinceVector<double>> counts;
};


NCovTimeseriesProvinceData extract_data_from_csv(std::string_view filename);







