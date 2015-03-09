require 'capybara/rspec'
require_relative 'test_methods.rb'
Capybara.default_driver = :selenium
Capybara.app_host = 'localhost:3000'