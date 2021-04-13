<?php
/**
 * The template for displaying single posts and pages.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

get_header();

$users = get_users();
?>

<main id="site-content" role="main" class="site-main">
<!--    <pre>-->
<!--    --><?php //print_r(get_users()) ?>
<!--</pre>-->

    <div class="container">
        <div class="popup-message popup-message__success">
            <p>Success message</p>
        </div>
        <div class="popup-message popup-message__error">
            <p>Error message</p>
        </div>
        <div class="users-table-wrap">
            <button class="users-btn">Create User</button>
            <div class="users-table">
                <div class="users-table__header">
                    <div class="users-table__cell cell-username">Username</div>
                    <div class="users-table__cell cell-first-name">First name</div>
                    <div class="users-table__cell cell-last-name">Last name</div>
                    <div class="users-table__cell cell-email">Email</div>
                    <div class="users-table__cell cell-type">Type</div>
                </div>
                <?php foreach ($users as $user):
                    $first_name = get_user_meta($user->ID, 'first_name', true );
                    $last_name = get_user_meta($user->ID, 'last_name', true );
                    $role = ucfirst($user->roles[0]);
//                    echo '<pre>';
//                    print_r($role);
//                    print_r(get_user_meta( $user->ID));
//                    echo '</pre>';
                    ?>
                <div class="users-table__row">
                    <div class="users-table__cell cell-username">
                        <a href="/user?id=<?= $user->ID; ?>"><?= $user->data->user_login; ?></a>
                    </div>
                    <div class="users-table__cell cell-first-name"><?= $first_name; ?></div>
                    <div class="users-table__cell cell-last-name"><?= $last_name; ?></div>
                    <div class="users-table__cell cell-email"><?= $user->data->user_email; ?></div>
                    <div class="users-table__cell cell-type"><?= $role; ?></div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="users-form-wrap">
            <button class="close-icon">
                <i class="font-icon icon-close"></i>
            </button>
            <h3 class="users-form__title">Create new user</h3>
            <form action="/wp-login.php?action=register" method="post">
                <div class="form-item">
                    <p class="users-form__text">Username*</p>
                    <input class="input form-error" type="text" name="user_login" required>
                    <div class="form-error__text">Error message</div>
                </div>
                <div class="form-item">
                    <p class="users-form__text">First name*</p>
                    <input class="input" type="text" name="fname" required>
                </div>
                <div class="form-item">
                    <p class="users-form__text">Last name*</p>
                    <input class="input" type="text" name="lname" required>
                </div>
                <div class="form-item">
                    <p class="users-form__text">Email*</p>
                    <div class="form-email">
                        <i class="font-icon icon-mail"></i>
                        <input class="input" type="text" name="user_email" required>
                    </div>
                </div>
                <div class="form-item">
                    <p class="users-form__text">Type*</p>
                    <div class="form-item form-select">
                        <i class="font-icon icon-arrow"></i>
                        <select class="input" name="type" id="type" required>
                            <option value=""></option>
                            <option value="Administrator">Admin</option>
                            <option value="Driver">Driver</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <p class="users-form__text">Password*</p>
                        <input class="input" type="password" required>
                    </div>
                    <div class="form-item">
                        <p class="users-form__text">Repeat password*</p>
                        <input class="input" type="password" required>
                    </div>
                    <input class="users-form__btn-submit" type="submit" value="Create">
            </form>
        </div>
    </div>

</main><!-- #site-content -->


<?php get_footer(); ?>
