$(document).ready(function() {
    $('#factsTab').addClass('selected');
    $('#factsTab').on("click", function() {
        $(this).addClass('selected');
        $('#opinionsTab').removeClass('selected');
        $('#experiencesTab').removeClass('selected');
        $('.opinionsPostsContainer').hide('slow');
        $('.experiencesPostsContainer').hide('slow');
        $('.newPostContainer').hide('slow');
        $('.factsPostsContainer').show('slow');
    });
    
    $('#opinionsTab').on("click", function() {
        $(this).addClass('selected');
        $('#factsTab').removeClass('selected');
        $('#experiencesTab').removeClass('selected');
        $('.factsPostsContainer').hide('slow');
        $('.experiencesPostsContainer').hide('slow');
        $('.newPostContainer').hide('slow');
        $('.opinionsPostsContainer').show('slow');
    });
    
    $('#experiencesTab').on("click", function() {
        $(this).addClass('selected');
        $('#factsTab').removeClass('selected');
        $('#opinionsTab').removeClass('selected');
        $('.factsPostsContainer').hide('slow');
        $('.opinionsPostsContainer').hide('slow');
        $('.newPostContainer').hide('slow');
        $('.experiencesPostsContainer').show('slow');
    });

    $('.newPostButton').on("click", function() {
        //Need to check user is signed in
        $('#factsTab').removeClass('selected');
        $('#opinionsTab').removeClass('selected');
        $('#experiencesTab').removeClass('selected');
        $('.factsPostsContainer').hide('slow');
        $('.opinionsPostsContainer').hide('slow');
        $('.experiencesPostsContainer').hide('slow');
        $('.newPostContainer').show('slow');
    });
});