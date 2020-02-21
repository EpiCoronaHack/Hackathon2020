//
// Created by george on 2020-02-19.
//

#include "model.hpp"


/**
 * Compute net population balance of people in a certain state of the SIR model travelling from a selected location.
 *
 * Transportation matrix is indexed (from,to)
 */
double compute_transportation_factor_for_state_of_population(
        const size_t selected_province,
        const Eigen::MatrixXd& transportation_matrix,
        const ByProvinceVector<double>& population,
        const ByProvinceVector<double>& population_in_state)
{
    double transportation_factor = 0;
    auto number_of_provinces = population.size();

    for(size_t other_province = 0; other_province < number_of_provinces; other_province++)
    {
        if(other_province == selected_province) continue;

        // Incoming population in the specified state
        transportation_factor +=
                transportation_matrix(other_province,selected_province)
                *population_in_state[other_province]/population[other_province];

        // Out going population in the specified state
        transportation_factor -=
                transportation_matrix(selected_province,other_province)
                *population_in_state[selected_province]/population[selected_province];
    }

    return transportation_factor;
}


ModelCoefficientArrays sir_coefficient_fit(
        const ByProvinceVector<double> population,
        const ByTimepointVector<ByProvinceVector<double>>& succeptibles,
        const ByTimepointVector<ByProvinceVector<double>>& infected,
        const ByTimepointVector<Eigen::MatrixXd>& transportation)
{
    auto number_of_provinces = population.size();
    auto number_of_time_points = succeptibles.size();

    ModelCoefficientArrays coefficients_by_province{
            std::vector<double>(number_of_provinces), std::vector<double>(number_of_provinces)};

    for(size_t province_id = 0; province_id<number_of_provinces; province_id++)
    {
        // Set up the linear system
        Eigen::MatrixXd A(2 * number_of_time_points-2, 2);
        Eigen::VectorXd B(2 * number_of_time_points-2,1);


        for (size_t timepoint = 0; timepoint < number_of_time_points-1; timepoint++)
        {
            // Equation for the succeptible population
            A(2*timepoint,0) = -succeptibles[timepoint][province_id]/population[timepoint];
            A(2*timepoint,1) = 0;
            const auto succeptibles_change = succeptibles[timepoint+1][province_id] - succeptibles[timepoint][province_id];
            B[2*timepoint] = succeptibles_change +
                             compute_transportation_factor_for_state_of_population(
                                     province_id,
                                     transportation[timepoint],
                                     population,
                                     succeptibles[timepoint]);

            // Equation for the infected population
            A(2*timepoint+1,0) = +succeptibles[timepoint][province_id]/population[timepoint];
            A(2*timepoint+1,1) = -infected[timepoint][province_id];
            const auto infected_change = infected[timepoint+1][province_id] - infected[timepoint][province_id];
            B[2*timepoint+1] = infected_change +
                               compute_transportation_factor_for_state_of_population(
                                       province_id,
                                       transportation[timepoint],
                                       population,
                                       succeptibles[timepoint]);
        }

        Eigen::VectorXd c = A.colPivHouseholderQr().solve(B);
        coefficients_by_province.r_0[province_id] = c[0]/c[1];
        coefficients_by_province.d_i[province_id] = 1/c[1];

    }

    return coefficients_by_province;
}

