require 'test_helper'

class Api::V1::ClientsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "index response should be JSON" do 
    get :index
    assert_equal 'application/json; charset=utf-8', response.content_type
  end

  test "index should display clients from database" do
    client = Client.create(name:'test client')
   
    # testing response to match information created in test database
    get :index
    clients = JSON.parse(response.body)
    assert_equal client.id, clients[0]["client"]["id"]
    assert_equal client.name, clients[0]["client"]["name"]
    assert_equal client.offers.length, clients[0]["client_offers"].length
  end 

end
