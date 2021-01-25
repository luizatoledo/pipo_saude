require 'test_helper'

class EmployeesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get employees_new_url
    assert_response :success
  end

  test "should get create" do
    get employees_create_url
    assert_response :success
  end

end
