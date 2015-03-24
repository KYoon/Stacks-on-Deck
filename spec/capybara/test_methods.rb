def create_room(username)
  visit "/"
  within "form#create" do
    fill_in "username", with: username
  end
  click_button "Create Room"
  return find("#roomId").text
end

def join_existing_room(username, roomId)
  visit "/"
  within "form#join" do
    fill_in "username", with: username
    fill_in "roomId",  with: roomId
  end
  click_button "Join Room"
end

def deal_cards(quantity)
  within "form.dealing-cards" do
    fill_in "initial-deal-count", with: quantity.to_s
  end
  click_button "Deal Them Cards"
end

def click_card(card_index)
  card = find("div:nth-child(#{card_index}) > .card")
  card.click
  return card.text
end

# < - > multi-browser methods < - >
# bruz marzolf
# http://blog.bruzilla.com/2012/04/10/using-multiple-capybara-sessions-in-rspec-request.html
def in_browser(name)
  old_session = Capybara.session_name

  Capybara.session_name = name
  yield

  Capybara.session_name = old_session
end

# method uses browser :one and broswer :two to put users in same room
def create_and_join_room(browser_one_username, browser_two_username)
  roomId = ""
  in_browser(:one) do
    roomId = create_room(browser_one_username)
  end
  in_browser(:two) do
    join_existing_room(browser_two_username, roomId)
  end
end