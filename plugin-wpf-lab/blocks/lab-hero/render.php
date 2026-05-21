<?php
/**
 * Render template for wpf/lab-hero.
 *
 * @var array  $attributes Block attributes.
 * @var string $content    Block inner content (none, this block is dynamic-only).
 * @var WP_Block $block    Block instance.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$eyebrow_tag        = isset( $attributes['eyebrowTag'] )        ? $attributes['eyebrowTag']        : 'FILE';
$eyebrow_text       = isset( $attributes['eyebrowText'] )       ? $attributes['eyebrowText']       : '';
$title_part_1       = isset( $attributes['titlePart1'] )        ? $attributes['titlePart1']        : '';
$title_highlight    = isset( $attributes['titleHighlight'] )    ? $attributes['titleHighlight']    : '';
$title_part_2       = isset( $attributes['titlePart2'] )        ? $attributes['titlePart2']        : '';
$lead               = isset( $attributes['lead'] )              ? $attributes['lead']              : '';
$cta_primary_label  = isset( $attributes['ctaPrimaryLabel'] )   ? $attributes['ctaPrimaryLabel']   : '';
$cta_primary_url    = isset( $attributes['ctaPrimaryUrl'] )     ? $attributes['ctaPrimaryUrl']     : '#';
$cta_ghost_label    = isset( $attributes['ctaGhostLabel'] )     ? $attributes['ctaGhostLabel']     : '';
$cta_ghost_url      = isset( $attributes['ctaGhostUrl'] )       ? $attributes['ctaGhostUrl']       : '#';
$meta_line          = isset( $attributes['metaLine'] )          ? $attributes['metaLine']          : '';

$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => 'wpf-lab-hero alignfull',
) );
?>
<section <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <?php if ( $eyebrow_tag || $eyebrow_text ) : ?>
        <p class="wpf-lab-hero__eyebrow">
            <?php if ( $eyebrow_tag ) : ?>
                <span class="wpf-lab-hero__eyebrow-tag"><?php echo esc_html( $eyebrow_tag ); ?></span>
            <?php endif; ?>
            <?php echo esc_html( $eyebrow_text ); ?>
        </p>
    <?php endif; ?>

    <?php if ( $title_part_1 || $title_highlight || $title_part_2 ) : ?>
        <h1 class="wpf-lab-hero__title">
            <?php echo esc_html( $title_part_1 ); ?>
            <?php if ( $title_highlight ) : ?>
                <span class="wpf-lab-hero__title-hl"><?php echo esc_html( $title_highlight ); ?></span>
            <?php endif; ?>
            <br>
            <?php echo esc_html( $title_part_2 ); ?>
        </h1>
    <?php endif; ?>

    <?php if ( $lead ) : ?>
        <p class="wpf-lab-hero__lead"><?php echo esc_html( $lead ); ?></p>
    <?php endif; ?>

    <?php if ( $cta_primary_label || $cta_ghost_label ) : ?>
        <div class="wpf-lab-hero__cta-row">
            <?php if ( $cta_primary_label ) : ?>
                <a class="wpf-lab-btn wpf-lab-btn--acid" href="<?php echo esc_url( $cta_primary_url ); ?>">
                    <?php echo esc_html( $cta_primary_label ); ?>
                </a>
            <?php endif; ?>
            <?php if ( $cta_ghost_label ) : ?>
                <a class="wpf-lab-btn wpf-lab-btn--ghost" href="<?php echo esc_url( $cta_ghost_url ); ?>">
                    <?php echo esc_html( $cta_ghost_label ); ?>
                </a>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <?php if ( $meta_line ) : ?>
        <p class="wpf-lab-hero__meta"><?php echo esc_html( $meta_line ); ?></p>
    <?php endif; ?>
</section>
