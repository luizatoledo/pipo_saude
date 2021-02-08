class PagesController < ApplicationController
  def home
    @employees = Employee.all
  end
end
