<?php
/**
 * Render template for wpf/lab-banner.
 *
 * @var array $attributes Block attributes.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$prefix      = isset( $attributes['prefix'] )      ? $attributes['prefix']      : '';
$method_num  = isset( $attributes['methodNum'] )   ? $attributes['methodNum']   : '';
$method_name = isset( $attributes['methodName'] )  ? $attributes['methodName']  : '';
$tag         = isset( $attributes['tag'] )         ? $attributes['tag']         : '';
$featured    = ! empty( $attributes['isFeatured'] );

$classes = 'wpf-lab-banner sec-method-banner alignfull';
if ( $featured ) { $classes .= ' is-featured'; }

$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => $classes,
) );
?>
<div <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <?php if ( $prefix )      : ?><p class="banner-prefix"><?php echo esc_html( $prefix ); ?></p><?php endif; ?>
    <?php if ( $method_num )  : ?><p class="banner-num"><?php echo esc_html( $method_num ); ?></p><?php endif; ?>
    <?php if ( $method_name ) : ?><p class="banner-name"><?php echo esc_html( $method_name ); ?></p><?php endif; ?>
    <?php if ( $tag )         : ?><p class="banner-tag"><?php echo esc_html( $tag ); ?></p><?php endif; ?>
</div>
