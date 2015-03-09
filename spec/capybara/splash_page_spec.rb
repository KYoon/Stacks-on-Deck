require_relative 'spec_helper.rb'

feature "splash page" do 
  before do
    in_browser(:one) do
      visit "/"
    end
  end
  
  scenario "has app name" do
    in_browser(:one) do
      expect(page).to have_content("Stacks on Deck")
    end
  end

  scenario "has Create Room button" do
    in_browser(:one) do
      expect(page).to have_button("Create Room")
    end
  end

  scenario "has Join Game button" do
    in_browser(:one) do
      expect(page).to have_button("Join Room")
    end
  end
end
