$(document).ready(function() {
    $('#factsTab').addClass('selected');
    $('#factsTab').on("click", function() {
        $(this).addClass('selected');
        $('#opinionsTab').removeClass('selected');
        $('#experiencesTab').removeClass('selected');
        $('#graphsTab').removeClass('selected');
        $('.opinionsPostsContainer').hide();
        $('.experiencesPostsContainer').hide();
        $('.graphsPostsContainer').hide();
        $('.factsPostsContainer').show();
    });
    
    $('#opinionsTab').on("click", function() {
        $(this).addClass('selected');
        $('#factsTab').removeClass('selected');
        $('#experiencesTab').removeClass('selected');
        $('#graphsTab').removeClass('selected');
        $('.factsPostsContainer').hide();
        $('.experiencesPostsContainer').hide();
        $('.graphsPostsContainer').hide();
        $('.opinionsPostsContainer').show();
    });
    
    $('#experiencesTab').on("click", function() {
        $(this).addClass('selected');
        $('#factsTab').removeClass('selected');
        $('#opinionsTab').removeClass('selected');
        $('#graphsTab').removeClass('selected');
        $('.factsPostsContainer').hide();
        $('.opinionsPostsContainer').hide();
        $('.graphsPostsContainer').hide();
        $('.experiencesPostsContainer').show();
    });

    $('#graphsTab').on("click", function() {
        $(this).addClass('selected');
        $('#factsTab').removeClass('selected');
        $('#opinionsTab').removeClass('selected');
        $('#experiencesTab').removeClass('selected');
        $('.factsPostsContainer').hide();
        $('.opinionsPostsContainer').hide();
        $('.experiencesPostsContainer').hide();
        $('.graphsPostsContainer').show();
    });
});