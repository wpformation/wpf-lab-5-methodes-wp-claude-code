<?php
/**
 * Render template for wpf/lab-cta-final.
 *
 * @var array $attributes Block attributes.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$eyebrow           = isset( $attributes['eyebrowText'] )     ? $attributes['eyebrowText']     : '';
$title_p1          = isset( $attributes['titlePart1'] )      ? $attributes['titlePart1']      : '';
$title_acid        = isset( $attributes['titleAcid'] )       ? $attributes['titleAcid']       : '';
$title_sep         = isset( $attributes['titleSep'] )        ? $attributes['titleSep']        : '';
$title_violet      = isset( $attributes['titleViolet'] )     ? $attributes['titleViolet']     : '';
$title_end         = isset( $attributes['titleEnd'] )        ? $attributes['titleEnd']        : '';
$cta_primary_label = isset( $attributes['ctaPrimaryLabel'] ) ? $attributes['ctaPrimaryLabel'] : '';
$cta_primary_url   = isset( $attributes['ctaPrimaryUrl'] )   ? $attributes['ctaPrimaryUrl']   : '#';
$cta_ghost_label   = isset( $attributes['ctaGhostLabel'] )   ? $attributes['ctaGhostLabel']   : '';
$cta_ghost_url     = isset( $attributes['ctaGhostUrl'] )     ? $attributes['ctaGhostUrl']     : '#';
$meta_line         = isset( $attributes['metaLine'] )        ? $attributes['metaLine']        : '';

$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => 'wpf-lab-cta alignfull',
) );
?>
<section <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <?php if ( $eyebrow ) : ?>
        <p class="wpf-lab-cta__eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
    <?php endif; ?>

    <h2 class="wpf-lab-cta__title">
        <?php echo esc_html( $title_p1 ); ?>
        <?php if ( $title_acid ) : ?>
            <span class="wpf-lab-cta__title-acid"><?php echo esc_html( $title_acid ); ?></span>
        <?php endif; ?>
        <br>
        <?php if ( $title_sep ) : ?>
            <span class="wpf-lab-cta__title-sep"><?php echo esc_html( $title_sep ); ?></span>
        <?php endif; ?>
        <?php if ( $title_violet ) : ?>
            <span class="wpf-lab-cta__title-violet"><?php echo esc_html( $title_violet ); ?></span>
        <?php endif; ?>
        <?php echo esc_html( $title_end ); ?>
    </h2>

    <div class="wpf-lab-cta__row">
        <?php if ( $cta_primary_label ) : ?>
            <a class="wpf-lab-btn wpf-lab-btn--acid-on-ink" href="<?php echo esc_url( $cta_primary_url ); ?>">
                <?php echo esc_html( $cta_primary_label ); ?>
            </a>
        <?php endif; ?>
        <?php if ( $cta_ghost_label ) : ?>
            <a class="wpf-lab-btn wpf-lab-btn--ghost-light" href="<?php echo esc_url( $cta_ghost_url ); ?>">
                <?php echo esc_html( $cta_ghost_label ); ?>
            </a>
        <?php endif; ?>
    </div>

    <?php if ( $meta_line ) : ?>
        <p class="wpf-lab-cta__meta"><?php echo esc_html( $meta_line ); ?></p>
    <?php endif; ?>
</section>
