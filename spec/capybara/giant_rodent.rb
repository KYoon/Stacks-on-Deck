require 'capybara/rspec'
Capybara.default_driver = :selenium
Capybara.app_host = 'localhost:3000'

feature "splash page" do 
  before do
    visit "/"
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
  scenario "can navigate to room page" do
    visit "/"
    click_button "Create Room"
    expect(page).to have_content "You are in the room"
  end

  scenario "entered username present on room page" do
    visit "/"
    within "form#create" do
      fill_in "username", with: "lil' brye brye"
    end
    click_button "Create Room"
    expect(page).to have_content "lil' brye brye"
  end
end

feature "join existing room" do
  scenario "can see other user in room" do
    roomkey = ""

    in_browser(:one) do
      roomkey = create_room("jnmandal")
    end

    in_browser(:two) do
      join_existing_room("bsheridan12", roomkey)
    end

    in_browser(:one) do
      expect(page).to have_content "bsheridan12"
    end
  end
end

def create_room(username)
  visit "/"
  within "form#create" do
    fill_in "username", with: username
  end
  click_button "Create Room"
  return find("#roomkey").text
end

def join_existing_room(username, roomkey)
  visit "/"
  within "form#join" do
    fill_in "username", with: username
    fill_in "roomkey",  with: roomkey
  end
  click_button "Join Room"
end

# bruz marzolf
# http://blog.bruzilla.com/2012/04/10/using-multiple-capybara-sessions-in-rspec-request.html
def in_browser(name)
  old_session = Capybara.session_name

  Capybara.session_name = name
  yield

  Capybara.session_name = old_session
end


