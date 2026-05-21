<?php
/**
 * Render template for wpf/lab-localnav.
 *
 * @var array $attributes Block attributes.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$brand = isset( $attributes['brand'] )    ? $attributes['brand']    : 'wpformation/lab';
$l1    = isset( $attributes['link1'] )    ? $attributes['link1']    : '';
$l2    = isset( $attributes['link2'] )    ? $attributes['link2']    : '';
$l3    = isset( $attributes['link3'] )    ? $attributes['link3']    : '';
$l4    = isset( $attributes['link4'] )    ? $attributes['link4']    : '';
$l5    = isset( $attributes['link5'] )    ? $attributes['link5']    : '';
$cta_l = isset( $attributes['ctaLabel'] ) ? $attributes['ctaLabel'] : '';
$cta_u = isset( $attributes['ctaUrl'] )   ? $attributes['ctaUrl']   : '#';

// Split brand on "/" for styling
$brand_parts = explode( '/', $brand, 2 );

$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => 'wpf-lab-localnav alignfull',
) );
?>
<section <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <div class="wpf-lab-localnav__row">
        <p class="wpf-lab-localnav__brand">
            <?php echo esc_html( $brand_parts[0] ); ?><?php if ( isset( $brand_parts[1] ) ) : ?><span class="wpf-lab-localnav__brand-sep">/</span><span class="wpf-lab-localnav__brand-lab"><?php echo esc_html( $brand_parts[1] ); ?></span><?php endif; ?>
        </p>
        <nav class="wpf-lab-localnav__links">
            <?php if ( $l1 ) : ?><span><?php echo esc_html( $l1 ); ?></span><?php endif; ?>
            <?php if ( $l2 ) : ?><span><?php echo esc_html( $l2 ); ?></span><?php endif; ?>
            <?php if ( $l3 ) : ?><span><?php echo esc_html( $l3 ); ?></span><?php endif; ?>
            <?php if ( $l4 ) : ?><span><?php echo esc_html( $l4 ); ?></span><?php endif; ?>
            <?php if ( $l5 ) : ?><span><?php echo esc_html( $l5 ); ?></span><?php endif; ?>
        </nav>
        <?php if ( $cta_l ) : ?>
            <a class="wpf-lab-localnav__cta" href="<?php echo esc_url( $cta_u ); ?>"><?php echo esc_html( $cta_l ); ?></a>
        <?php endif; ?>
    </div>
</section>
