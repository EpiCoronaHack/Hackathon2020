cmake_minimum_required(VERSION 3.5)


project(simultaneus_transportation_seiv_model)


####################################################
# General configuration

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -g -std=c++17 -Wall -pedantic")


###################################################
# Executable 


add_executable(simultaneus_transportation_seiv_model
    main.cpp
        model.cpp csv_read.cpp csv_read.hpp)


set(Boost_USE_STATIC_LIBS OFF) 
set(Boost_USE_MULTITHREADED ON)  
set(Boost_USE_STATIC_RUNTIME OFF) 
find_package(Boost COMPONENTS filesystem) 


include_directories(${Boost_INCLUDE_DIRS}) 
target_link_libraries(simultaneus_transportation_seiv_model ${Boost_LIBRARIES})
