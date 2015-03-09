require_relative 'spec_helper.rb'


feature "create room" do 
  scenario "can navigate to room page" do
    in_browser(:one) do
      create_room("blehg")
      expect(page).to have_content "You are in the room"
    end
  end

  scenario "entered username present on room page" do
    in_browser(:one) do
      create_room("lil' brye brye")
      expect(page).to have_content "lil' brye brye"
    end
  end
end

feature "join existing room" do
  scenario "can see other users in room" do
    create_and_join_room("jnmandal", "bsheridan12")
    in_browser(:one) do
      expect(page).to have_content "bsheridan12"
    end
    in_browser(:two) do
      expect(page).to have_content "jnmandal"
    end
  end
end