require 'capybara/rspec'
Capybara.default_driver = :selenium
Capybara.app_host = 'localhost:3000'

feature "splash page" do 
  before do
    visit '/'
  end
  
  scenario "has app name" do
    expect(page).to have_content("Stacks on Deck")
  end

  scenario "has Create Room button" do
    expect(page).to have_button("Create Room")
  end

  scenario "has Join Game button" do
    expect(page).to have_button("Join Room")
  end
end

feature "create room" do


end





