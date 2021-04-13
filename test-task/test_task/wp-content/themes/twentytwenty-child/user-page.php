<?php
/* Template Name: User Page */

get_header();

//$user = get_user();
$user_id = $_GET['id'];
$user = [
    'first_name' => get_user_meta($user_id, 'first_name', true),
    'last_name' => get_user_meta($user_id, 'last_name', true),
];
//print_r($user);

?>

<main id="site-content" role="main" class="site-main">

    <div class="container">

        <div class="user-page">

            <ul class="breadcrumbs">
                <li>
                    <a href="/">Home</a>
                </li>
                >
                <li>
                    <span><?= $user['first_name'] ?></span>
                </li>
            </ul>

            <div class="user-info">
                <div class="first-name">First name: <?= $user['first_name'] ?></div>
                <div class="last-name">Last name: <?= $user['last_name'] ?></div>
            </div>

        </div>

    </div>

</main><!-- #site-content -->


<?php get_footer(); ?>
