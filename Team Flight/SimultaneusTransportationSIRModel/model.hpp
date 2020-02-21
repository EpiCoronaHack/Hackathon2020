//
// Created by george on 2020-02-19.
//
#pragma once

#include "csv_read.hpp"

#include <vector>
#include <eigen3/Eigen/Dense>


struct ModelCoefficientArrays{
    // Values by location id
    std::vector<double> r_0;
    std::vector<double> d_i;
};


ModelCoefficientArrays sir_coefficient_fit(
        const ByProvinceVector<double> population,
        const ByTimepointVector<ByProvinceVector<double>>& succeptibles,
        const ByTimepointVector<ByProvinceVector<double>>& infected,
        const ByTimepointVector<Eigen::MatrixXd>& transportation);


